import { useState } from "react";
import Autosuggest from "react-autosuggest";

const emailTest = ["john@example.com", "jane@domain.com", "doe@mail.com"]

const getEmails = (value: string) => {
  const inputValue = value.trim().toLowerCase()
  return emailTest.filter(email => email.toLowerCase().includes(inputValue))
}

const AutoCompleteEmail = () => {
  const [value, setValue] = useState('')
  const [email, setEmail] = useState<string[]>([])

  return (
    <Autosuggest
    suggestions={email}
    onSuggestionsFetchRequested={({ value }) = setEmail(getEmails(value))}


  )
}