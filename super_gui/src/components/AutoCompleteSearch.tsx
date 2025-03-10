import { useState } from "react";
import Autosuggest, { InputProps, ChangeEvent } from "react-autosuggest";

interface Tenant {
  firstName: string;
  email: string;
  apt: string;

}
// const emailTest: Tenant[] = [
  
//   {name: 'Sam Donald', email: 'sam@example.com', apt: "118"},  
//   {name: 'Jane Donald', email: 'jane@domain.com.com', apt: "150"},  
//   {name: 'Doe Donald', email: 'doe@mail.com', apt: "150"}  
// ]
    
const AutoCompleteTenant = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Tenant[]>([])
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  const onChange = (
    event: React.FormEvent<HTMLElement>, 
    { newValue }: ChangeEvent
  ) => { 
    setValue(newValue)
    setSelectedTenant(null) //Clear selected info when input changes
  }

  const onSuggestionsFetchRequested = async ({ value }: {value: string}) => {
    setIsLoading(true); // Set loading state
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${value}`);
      const data = await response.json();
      setSuggestions(data.users); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    } 
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }

  const inputProps: InputProps<Tenant> = {
    placeholder: "Email",
    value,
    onChange,
    className: "w-[320px] border rounded-md px-4 py-2 bg-[var(--color-white)] text-[var(--color-grey-800)] font-normal text-sm border-[var(--color-grey-400)] focus:outline-none focus:ring-2 focus:ring-blue-500"
  }
  //Style dropdown
  const theme = {
    container: "relative",
    containerOpen: "block",
    input: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
    suggestionsContainer: "absolute mt-1 w-[320px] rounded-md shadow-md bg-transparent z-10",
    suggestionsList: "bg-[var(--color-white)] rounded-md", // Ensures suggestions have a background
    suggestion: "p-3 text-[var(--color-grey-800)] cursor-pointer hover:bg-gray-100",
    suggestionHighlighted: "bg-blue-500 text-[var(--color-grey-800)]"
  }

  
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue.length === 0
      ? []
      : users.email.filter(
          (tenant) => tenant.email.toLowerCase().includes(inputValue)
        );
  }

  const getSuggestionValue = (suggestion: Tenant) => suggestion.email

  const renderSuggestion = (suggestion: Tenant) => (
    <div className="p-3 border-1"
    onClick={() => {
      setValue(suggestion.email) //Set input val to selected email
      setSelectedTenant(suggestion) // Store selected Tenant for display
    }}
    >
      {suggestion.email}
      {suggestion.apt}   
    </div>
  )

  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="flex flex-col items-center">
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        />
      </div>
      <div className="flex flex-col h-[190px] bg-[var(--color-white)] rounded-lg font-normal text-sm">
        <div className="border border-(--color-beige)">
          <h2 className="text-left font-(family-name:--font-subHeading) text-(length:--text-xl) text-black p-[12px]">Tenant</h2>
        </div>
        <div className="bg-[var(--color-white)] rounded-lg text-[var(--color-grey-800)] font-normal text-sm">
          {selectedTenant && ( // Conditionally render info if email is selected
            <div>
              <p className="color-grey-800">Name: {selectedTenant.firstName}</p>
              <p className="color-grey-800">Apartment: {selectedTenant.apt}</p>
            </div>
          )}
        </div>
    </div>
    </div>
  )
}
export default AutoCompleteTenant