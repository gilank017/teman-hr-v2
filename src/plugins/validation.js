export const validation = ( formData, setValidationForm ) => {
  const language = localStorage.getItem("hris-tandeem-language")
  const errorMessage = language === '"en"' ? 'This form is required' : 'Formulir ini diperlukan'
  let isError = []
  // eslint-disable-next-line
  Object.keys(formData).map((el) => {
    if (!formData[el] && el) {
      setValidationForm((old) => ({
        ...old,
        [el]: {
          isError: true,
          message: errorMessage
        }
      }))
      isError.push(el)
    }
  })
  return isError.length > 0 ? true : false
}