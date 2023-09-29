import { createContext, useState } from "react";
export const Article_data = createContext();
function Context({ children }) {
  const [article, setArticle] = useState();

  return (
    <Article_data.Provider value={{ article, setArticle }}>
      {children}
    </Article_data.Provider>
  );
}
export default Context