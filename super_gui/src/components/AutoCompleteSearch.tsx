import { useState } from "react"
import Autosuggest, { InputProps, ChangeEvent } from "react-autosuggest"
import FileUpload from "./Uploader";
import { DisplayAllLeaseByUsername, Lease } from "./LeaseDetails";

interface User {
	name: string
	email: string
	username: string
	leaseHistory?: Lease[]
}

const AutoCompleteTenant = () => {
	const [value, setValue] = useState("")
	const [suggestions, setSuggestions] = useState<User[]>([])
	const [selectedTenant, setSelectedTenant] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(false) // Add loading state
	const [username, setUsername] = useState<string>("")

	const onChange = (
		event: React.FormEvent<HTMLElement>,
		{ newValue, method }: ChangeEvent,
	) => {
		setValue(newValue)
		if (newValue === "") {
		setSelectedTenant(null) //Clear selected info when input changes
		setUsername("")
		}
	}
	const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
		setIsLoading(true) // Set loading state
		try {
			const response = await fetch(`/api/users/search?email=${value}&page=0&size=10&sortParam=email`, {
				method: "GET",
				headers: {
					"Content-Type": "application/hal+json",
				},
			})
			const data = await response.json();
			setSuggestions(data._embedded.userReadList);
		} catch (error) {
			console.error("Error fetching data:", error)
		} finally {
			setIsLoading(false)
		}
	}

	const onSuggestionsClearRequested = () => {
		setSuggestions([])
	}

	const inputProps: InputProps<User> = {
		placeholder: "Email",
		value: value,
		onChange: onChange,
		// onChange: (_, { newValue, method }) => {

		// },
		className:
			"w-[320px] border rounded-md px-4 py-2 bg-[var(--color-white)] text-[var(--color-grey-800)] font-normal text-sm border-[var(--color-grey-400)] focus:outline-none focus:ring-2 focus:ring-blue-500",
	}
	//Style dropdown
	const theme = {
		container: "relative",
		containerOpen: "block absolute z-2",
		input:
			"w-full px-4 py-2 border border-red rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
		suggestionsContainer:
			"absolute mt-1 w-[320px] rounded-md shadow-md bg-transparent z-10",
		suggestionsList: "bg-[var(--color-white)] rounded-md", // Ensures suggestions have a background
		suggestion:
			"p-3 text-[var(--color-grey-800)] cursor-pointer hover:bg-gray-100",
		suggestionHighlighted: "bg-blue-500 text-[var(--color-grey-800)]",
	}

	// shouuld this be used in fetch?
	// const getSuggestions = (value: string) => {
	// 	const inputValue = value.trim().toLowerCase()
	// 	return inputValue.length === 0
	// 		? []
	// 		: users.email.filter((tenant: User) =>
	// 				tenant.email.toLowerCase().includes(inputValue),
	// 		)
	// }

	const getSuggestionValue = (suggestion: User) => suggestion.email

	const renderSuggestion = (suggestion: User) => (
		<div
			className="p-3 border-1"
			onClick={() => {
				setValue(suggestion.email) //Set input val to selected email
				setSelectedTenant(suggestion) // Store selected Tenant for display
				setUsername(suggestion.username || '')
			}}
		>
			{suggestion.email}
		</div>
	)

	return (
      <div className="grid h-auto p-10 text-center gmt-10 rounded-2xl bg-accentBlue">
        <div className="flex flex-col items-center bg-[var(--color-white)] rounded-lg shadow-md py-4">
					<h2 className="text-left font-(family-name:--font-subHeading) text-(length:--text-xl) text-black p-2.5">
              Admin Dashboard
          </h2>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={(_, { suggestionValue }) =>
              console.log("Selected: " + suggestionValue)
            }
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={theme}
          />
        </div>
	
				<div className="bg-[var(--color-white)] rounded-lg text-[var(--color-grey-800)] font-normal text-sm mt-2">
					{value && !suggestions.length && !selectedTenant ? ( 
						<p>No tenant found</p> 
					) : (  
						value && selectedTenant ? (
						<div>
							<p className="color-grey-800">Name: {selectedTenant.name}</p>
							<p className="color-grey-800">Username: {selectedTenant.username}</p>
			{/* todo passing in props of username is giving me issue. can you please resolve this 	*/}		
					<DisplayAllLeaseByUsername username={selectedTenant.username} />
					<FileUpload signerEmail={selectedTenant.email} />
						</div>
					) : null
					)}
				</div>

      </div>
	)
}
export default AutoCompleteTenant