import React, { useState } from "react"

const FileUpload = ( {signerEmails}: {signerEmails: string} ) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [status, setStatus] = useState<
		"initial" | "uploading" | "success" | "fail"
	>("initial")

	interface LeaseSignatureRequestDetails {
		signerEmails: string[]
		apartmentNumber: number
		ccEmails: string[]
	}

	interface MetaData {
		title: string
		description: string
		startDate: string
		endDate: string
	}
	// Sample data, for testing purposes you can change the signer email to you own email to verify, but in production it should be the tenant's email which is passed over from the user search result passing in the email.
	const leaseSignatureRequestDetails: LeaseSignatureRequestDetails = {
		signerEmails: [ signerEmails ],
		apartmentNumber: 2,
		ccEmails: ["rubengarcia0515@gmail.com"],
	}

	const metaData: MetaData = {
		title: "Sample File",
		description: "This is a test file",
		startDate: "2025-09-01",
		endDate: "2026-08-31",

	}

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0])
		}
	}

	const handleUpload = async () => {
		if (!selectedFile) return

		setStatus("uploading")
		const fileContents = await selectedFile.arrayBuffer()
		const file = new File([fileContents], selectedFile.name, {
			type: selectedFile.type,
		})
		console.log("Original File Type:", file.type)
    console.table(file)
	
		const formData = new FormData()
		formData.append("file", selectedFile)
		formData.append(
			"leaseSignatureRequestDetails",
			JSON.stringify(leaseSignatureRequestDetails),
		)
		formData.append("metaData", JSON.stringify(metaData))

		console.log(file)
    console.table(formData)

		try {
			const result = await fetch("/api/document/send", {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json", 
				},
			})

			const data = await result.json()
			console.log(data)

			if (result.ok) {
				setStatus("success")
			} else {
				setStatus("fail")
			}
		} catch (error) {
			console.error(error)
			setStatus("fail")
		}
	}

	return (
		<>
			<h3 className="text-xl mt-2.5 font-[Raleway]">Upload Tenant Lease</h3>
			<p className="font-[var(--font-body)] text-sm text-[var(--color-grey-800)] italic mb-2.5">
				pdf format
			</p>
			<div className="flex flex-col items-center justify-center">
				<label
					htmlFor="file"
					className="cursor-pointer bg-[var(--color-blue)] text-[var(--color-white)] text-xl rounded-sm py-4 px-10 capitalize"
				>
					{selectedFile ? selectedFile.name : "Choose a file"}
				</label>
				<input
					id="file"
					type="file"
					accept="application/pdf"
					onChange={onFileChange}
					className="hidden"
				/>
        <label
					htmlFor="carbon-copy"
					className="block mb-1 text-sm font-medium text-gray-700">
            CC Email Address
				</label>
				<input
					id="carbon-copy"
					type="email"
					onChange={onFileChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
        <label
					htmlFor="start"
					className="block mb-1 text-sm font-medium text-gray-700">
            Lease Start Date
				</label>
				<input
					id="start"
					type="date"
					// value={formData.startDate}
					onChange={onFileChange}
					className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
        <label
					htmlFor="end"
					className="block mb-1 text-sm font-medium text-gray-700">
            Lease End Date
				</label>
				<input
					id="end"
					type="date"
					onChange={onFileChange}
					className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			{selectedFile && (
				<section className="flex flex-col items-center mt-4 text-[var(--color-grey-800)]">
					File details:
					<ul>
						<li>Name: {selectedFile.name}</li>
						<li>Size: {selectedFile.size} bytes</li>
					</ul>
				</section>
			)}

			{selectedFile && (
				<button
					onClick={handleUpload}
					className="mt-5 bg-[var(--color-blue)] text-white text-xl rounded-sm py-4 px-8 capitalize cursor-pointer"
				>
					Upload a file
				</button>
			)}
			<Result status={status} />
		</>
	)
}

const Result = ({ status }: { status: string | null }) => {
	if (status === "success") {
		return <p className="pt-3">✅ File uploaded successfully!</p>
	} else if (status === "fail") {
		return <p className="pt-3">❌ File upload failed!</p>
	} else if (status === "uploading") {
		return <p className="pt-3">⏳ Uploading selected file...</p>
	} else {
		return null
	}
}

export default FileUpload
