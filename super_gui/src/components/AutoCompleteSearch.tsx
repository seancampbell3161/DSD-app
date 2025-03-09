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
    input: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    suggestionsContainer: "absolute mt-1 w-[320px] rounded-lg shadow-md bg-transparent z-10",
    suggestionsList: "bg-white rounded-lg", // Ensures suggestions have a background
    suggestion: "p-3 cursor-pointer hover:bg-gray-100",
    suggestionHighlighted: "bg-blue-500 text-white"
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
      {suggestion.firstName}
      {suggestion.email}
      {suggestion.apt}   
    </div>
  )

  return (
    <>
      <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
      />
       {selectedTenant && ( // Conditionally render info if email is selected
        <div>
          <p className="color-grey-800">Name: {selectedTenant.firstName}</p>
          <p className="color-grey-800">Apartment: {selectedTenant.apt}</p>
        </div>
      )}
    </>
  )
}
export default AutoCompleteTenant