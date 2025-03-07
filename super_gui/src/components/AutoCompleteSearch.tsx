import { useState } from "react";
import Autosuggest, { InputProps } from "react-autosuggest";

const emailTest = ["sam@example.com", "jane@domain.com", "doe@mail.com"]

const AutoCompleteEmail = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const onChange = (event: React.FormEvent<HTMLElement>, { newValue }: Autosuggest.ChangeEvent) => {
    setValue(newValue);
  }
  const onSuggestionsFetchRequested = ({ value }: {value: string }) => {
    setSuggestions(() => getSuggestions(value));
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }
  const inputProps: InputProps<string> = {
    placeholder: "search your data",
    value,
    onChange: onChange
  }

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : emailTest.filter(
          (email:string) => email.toLowerCase().slice(0, inputLength) === inputValue
        );
  }

  const getSuggestionValue = (suggestion: string) => suggestion


  const renderSuggestion = (suggestion:string) => (
    <div className="p-3 border-1">{suggestion}</div>
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
    </>
  )
}
export default AutoCompleteEmail