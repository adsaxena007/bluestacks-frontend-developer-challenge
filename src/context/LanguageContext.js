import React from 'react'



//Creating context for changing language on App Level
const LanguageContext = React.createContext({})
export const LanguageProvider = LanguageContext.Provider
export default LanguageContext