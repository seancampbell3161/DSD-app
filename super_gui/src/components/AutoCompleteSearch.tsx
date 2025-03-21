import { useState } from "react"
import Autosuggest, { InputProps, ChangeEvent } from "react-autosuggest"
import FileUpload from "./Uploader";

interface User {
	name: string
	email: string
	username: string
}
// const emailTest: Tenant[] = [

//   {name: 'Sam Donald', email: 'sam@example.com', apt: "118"},
//   {name: 'Jane Donald', email: 'jane@domain.com.com', apt: "150"},
//   {name: 'Doe Donald', email: 'doe@mail.com', apt: "150"}
// ]

const AutoCompleteTenant = () => {
	const [value, setValue] = useState("")
	const [suggestions, setSuggestions] = useState<User[]>([])
	const [selectedTenant, setSelectedTenant] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(false) // Add loading state

	const onChange = (
		event: React.FormEvent<HTMLElement>,
		{ newValue, method }: ChangeEvent,
	) => {
		setValue(newValue)
		setSelectedTenant(null) //Clear selected info when input changes
	}
	const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
		setIsLoading(true) // Set loading state
		try {
			fetch(`/api/users/search?email=${value}&page=0&size=10&sortParam=email`, {
				method: "GET",
				headers: {
					"Content-Type": "application/hal+json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					setSuggestions(data._embedded.userReadList)
				})
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
			}}
		>
			{suggestion.email}
			{suggestion.username}
      {suggestion.name}
		</div>
	)

	return (
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="flex flex-col items-center">
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
        <div className="flex flex-col h-auto bg-[var(--color-white)] rounded-lg font-normal text-sm pt-3 px-2.5 pb-5">
          <div className="border-b-1 border-(--color-beige)">
            <h2 className="text-left font-(family-name:--font-subHeading) text-(length:--text-xl) text-black pb-2.5">
              Tenant
            </h2>
          </div>
          <div className="bg-[var(--color-white)] rounded-lg text-[var(--color-grey-800)] font-normal text-sm mt-2">
            {selectedTenant && ( // Conditionally render info if email is selected
              <div>
                <p className="color-grey-800">Name: {selectedTenant.name}</p>
                <p className="color-grey-800">Username: {selectedTenant.username}</p>
              </div>
            )}
          </div>
					<div><FileUpload /></div>
        </div>
      </div>
	)
}
export default AutoCompleteTenant