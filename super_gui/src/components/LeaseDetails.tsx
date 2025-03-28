import { useState, useEffect } from "react"

export interface LeaseDTO {
	id: number
	status: string
	externalId: string
	startDate: string
	endDate: string
	apartmentNumber: number
	tenants: any[]
	dropboxUrl: string, 
	signatureRequestGetResponse?: any

}
//test this. This is the endpoint to get all leases by username. Need to resolve prop type input passed from suggestion in autocomplete
const getAllLeasesByUsername = async (username: string) => {
	const result = await fetch(`https://dsd-backend-production.up.railway.app/document/getAllByUser/${username}`, {
		method: "GET",
	})

	const data = await result.json()
	console.log(data)
	return data
}

export const DisplayAllLeaseByUsername = ({ username }: { username: string }) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [list, setList] = useState<LeaseDTO[] | null>(null)

	useEffect(() => {
		// Fetch lease data when the component mounts
		getAllLeasesByUsername(username)
			.then((data) => {
				setList(data)
				setLoading(false)
			})
			.catch((err) => {
				if (err instanceof Error) {
					setError(err.message)
				}
			})
	}, [username])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div>
			<h1 className="pt-2.5 text-(length:--text-xl) text-black">Lease Histories</h1>
			{list ? (
				<div>
					<ul>
						{list.map((lease) => (
							<li key={lease.id}>
								<p>
									<strong>External ID:</strong> {lease.externalId}
								</p>
								<p>
									<strong>Status:</strong> {lease.status}
								</p>
								<p>
									<strong>Start Date:</strong> {lease.startDate}
								</p>
								<p>
									<strong>End Date:</strong> {lease.endDate}
								</p>
								<p>
									<strong>Apartment:</strong> {lease.apartmentNumber
										? lease.apartmentNumber
										: "N/A"}
								</p>
								<p>
								<a href={lease.dropboxUrl} target="_blank" rel="noopener noreferrer">download link</a>
								</p>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No lease data found.</p>
			)}
		</div>
	)
}

export interface Lease {
	id: number
	externalId: string 
}

const getLeaseDetails = async (lease: Lease) => {
	const result = await fetch("https://dsd-backend-production.up.railway.app/document/get/" + lease.id, {
		method: "GET",
	})

	const data = await result.json()

	console.log(data)
	return data
}
//todo update to actual response from getLeaseDetails endpoint
interface LeaseDetails{
    dropboxDocumentUrl: string

}
const LeaseDetails = (lease: Lease) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [leaseDetails, setLeaseDetails] = useState<LeaseDetails | null>(null)

	useEffect(() => {
		// Fetch lease data when the component mounts
		getLeaseDetails(lease)
			.then((data) => {
				setLeaseDetails(data)
				setLoading(false)
			})
			.catch((err) => {
				if (err instanceof Error) {
					setError(err.message)
				}
			})
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div>
			<h1>Lease Details</h1>
			{leaseDetails ? (
				<div>
					<p>
					   {/* todo add field to get dropboxz url to download doc along with status from our db and any other useful info from endpoint */}
						<strong>dropbox document url:</strong> {leaseDetails.dropboxDocumentUrl}
					</p>
				</div>
			) : (
				<p>No lease data found.</p>
			)}
		</div>
	)
}

// const getAllLeases = async () => {
// 	const result = await fetch("https://dsd-backend-production.up.railway.app/document/all", {
// 		method: "GET",
// 	})
// const getAllLeases = async () => {
// 	const result = await fetch("/api/document/all", {
// 		method: "GET",
// 	})

// 	const data = await result.json()
// 	console.log(data)
// 	return data
// }
//needs to update interface to actual response
// const displayAllLease = () => {
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState<string | null>(null)
// 	const [list, setList] = useState<Lease[] | null>(null)
//     const [selectedLease] = useState<Lease | null>(null)

// 	useEffect(() => {
// 		// Fetch lease data when the component mounts
// 		getAllLeases()
// 			.then((data) => {
// 				setList(data)
// 				setLoading(false)
// 			})
// 			.catch((err) => {
// 				if (err instanceof Error) {
// 					setError(err.message)
// 				}
// 			})
// 	}, [])

// 	if (loading) {
// 		return <div>Loading...</div>
// 	}

// 	if (error) {
// 		return <div>Error: {error}</div>
// 	}
// 	//todo add other fields in response
// 	return (
// 		<div>
// 			<h1 className="text-(length:--text-xl) text-black">Lease Details</h1>
// 			{list ? (
// 				<div>
// 					<ul>
// 						{list.map((lease) => (
// 							<li key={lease.id}>
// 								<button onClick={() => LeaseDetails(lease)}>
// 									Select {lease.id}
// 								</button>
// 								<p>
// 									<strong>External ID:</strong> {lease.externalId}
// 								</p>
// 							</li>
// 						))}
// 					</ul>
//                     {selectedLease && <LeaseDetails {...selectedLease} />}
// 				</div>
// 			) : (
// 				<p>No lease data found.</p>
// 			)}
// 		</div>
// 	)
// }
