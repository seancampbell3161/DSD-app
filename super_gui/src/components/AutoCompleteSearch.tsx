import { useState } from "react";
import Autosuggest, { InputProps, ChangeEvent } from "react-autosuggest";

interface Tenant {
  name: string;
  email: string;
  apt: string;

}

const emailTest: Tenant[] = [
  
  {name: 'Sam Donald', email: 'sam@example.com', apt: "118"},  
  {name: 'Jane Donald', email: 'jane@domain.com.com', apt: "150"},  
  {name: 'Doe Donald', email: 'doe@mail.com', apt: "150"}  
]
    
const AutoCompleteTenant = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Tenant[]>([])
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)


  const onChange = (
    event: React.FormEvent<HTMLElement>, 
    { newValue }: ChangeEvent
  ) => { 
    setValue(newValue)
    setSelectedTenant(null) //Clear selected info when input changes
  }

  const onSuggestionsFetchRequested = ({ value }: {value: string}) => {
    setSuggestions(getSuggestions(value));
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }

  const inputProps: InputProps<Tenant> = {
    placeholder: "search your data",
    value,
    onChange
  }

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue.length === 0
      ? []
      : emailTest.filter(
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
      {suggestion.name}
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
      />
       {selectedTenant && ( // Conditionally render info if email is selected
        <div>
          <p>Name: {selectedTenant.name}</p>
          <p>Apartment: {selectedTenant.apt}</p>
        </div>
      )}
    </>
  )
}
export default AutoCompleteTenant