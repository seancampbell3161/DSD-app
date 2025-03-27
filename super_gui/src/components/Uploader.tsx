import React, { useState } from "react"

const FileUpload = ( {signerEmail}: {signerEmail: string} ) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [status, setStatus] = useState<"initial" | "uploading" | "success" | "fail">("initial")
  const [formData, setFormData] = useState({
    apartmentNumber: '',
    ccEmails: '',
    startDate: '',
    endDate: ''
  })

	interface LeaseSignatureRequestDetails {
		signerEmail: string
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
	// const leaseSignatureRequestDetails: LeaseSignatureRequestDetails = {
	// 	signerEmails: [ signerEmails ],
	// 	apartmentNumber: 2,
	// 	ccEmails: ["rubengarcia0515@gmail.com"],
	// }

	// const metaData: MetaData = {
	// 	title: "Sample File",
	// 	description: "This is a test file",
	// 	startDate: "2025-09-01",
	// 	endDate: "2026-08-31",

	// }

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0])
		}
	}

	const handleUpload = async ( e: React.FormEvent) => {
    e.preventDefault()

		if (!selectedFile) return

		setStatus("uploading")

    const leaseSignatureRequestDetails = {
      signerEmail: signerEmail,
      apartmentNumber: parseInt(formData.apartmentNumber) || 0,
      ccEmails: [formData.ccEmails]
    }

    const metaData = {
      title: "Tenant Lease",
      description: "Lease document for tenant",
      startDate: formData.startDate,
      endDate: formData.endDate
    }
	
		const formDataToSend = new FormData()
		formDataToSend.append("file", selectedFile)
		formDataToSend.append(
			"leaseSignatureRequestDetails",
			JSON.stringify(leaseSignatureRequestDetails),
		)
		formDataToSend.append("metaData", JSON.stringify(metaData))


		try {
			const result = await fetch("/api/document/send", {
				method: "POST",
				body: formDataToSend,
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

  const handleProcess = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
    console.log(`Updated ${id} to: ${value}`)
  }

  
	return (
		<>
			<h3 className="text-xl mt-2.5 font-[Raleway]">Upload Tenant Lease</h3>
			<p className="font-[var(--font-body)] text-sm text-[var(--color-grey-800)] italic mb-2.5">
				pdf format
			</p>
      <form onSubmit={handleUpload} className="pb-7">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="file"
            className="cursor-pointer bg-[var(--color-blue)] text-[var(--color-white)] text-xl rounded-sm py-2 px-5 capitalize"
          >
            {selectedFile ? selectedFile.name : "Choose a file"}
          </label>
          <input
            id="file"
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            className="hidden"
            required
          />

          <label
            htmlFor="apartmentNumber"
            className="block py-2 text-sm font-medium text-gray-700">
              Apartment Number
          </label>
          <input
            id="apartmentNumber"
            type="text"
            onChange={handleProcess}
            value={formData.apartmentNumber}
            placeholder="Apartment Number"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="ccEmails"
            className="block py-2 text-sm font-medium text-gray-700">
              CC Email Address
          </label>
          <input
            id="ccEmails"
            type="email"
            placeholder="CC Email Address"
            onChange={handleProcess}
            value={formData.ccEmails}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label
            htmlFor="startDate"
            className="block py-2 text-sm font-medium text-gray-700">
              Lease Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleProcess}
            className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="endDate"
            className="block py-2 text-sm font-medium text-gray-700">
              Lease End Date
          </label>
          <input
            id="endDate"
            type="date"
            onChange={handleProcess}
            value={formData.endDate}
            className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {selectedFile && (
          <section className="flex flex-col items-center mt-4 text-[var(--color-grey-800)]">
            File details:
            <ul>
              <li>Name: {selectedFile.name}</li>
            </ul>
          </section>
        )}

        {selectedFile && (
          <button
            type="submit"
            className="mt-5 bg-[var(--color-blue)] text-white text-xl rounded-sm py-4 px-8 capitalize cursor-pointer"
          >
            Upload a file
          </button>
        )}
        <Result status={status} />
      </form>
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
