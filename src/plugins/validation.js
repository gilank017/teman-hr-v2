export const validation = ( formData, setValidationForm ) => {
  let isError = []
  // eslint-disable-next-line
  Object.keys(formData).map((el) => {
    if (!formData[el] && el) {
      setValidationForm((old) => ({
        ...old,
        [el]: {
          isError: true,
          message: `This form is required`
        }
      }))
      isError.push(el)
    }
  })
  return isError.length > 0 ? true : false
}