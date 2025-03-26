import { useState, useEffect } from "react"

export interface Lease {
	id: number
	externalId: string //dropbox sign id
}

const getLeaseDetails = async (lease: Lease) => {
	const result = await fetch("/api/document/get/" + lease.id, {
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
//optional to get all leases in the db for like a dashboard for admin to view all leases
const getAllLeases = async () => {
	const result = await fetch("/api/document/all", {
		method: "GET",
	})

	const data = await result.json()
	console.log(data)
	return data
}
//needs to update interface to actual response
const displayAllLease = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [list, setList] = useState<Lease[] | null>(null)
    const [selectedLease, setSelectedLease] = useState<Lease | null>(null)

	useEffect(() => {
		// Fetch lease data when the component mounts
		getAllLeases()
			.then((data) => {
				setList(data)
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
	//todo add other fields in response
	return (
		<div>
			<h1>Lease Details</h1>
			{list ? (
				<div>
					<ul>
						{list.map((lease) => (
							<li key={lease.id}>
								<button onClick={() => LeaseDetails(lease)}>
									Select {lease.id}
								</button>
								<p>
									<strong>External ID:</strong> {lease.externalId}
								</p>
							</li>
						))}
					</ul>
                    {selectedLease && <LeaseDetails {...selectedLease} />}
				</div>
			) : (
				<p>No lease data found.</p>
			)}
		</div>
	)
}
