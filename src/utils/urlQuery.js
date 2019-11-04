export const setQuery = (name,value) => {
  const params = new URLSearchParams(window.location.search)
  params.append(name,value);
  window.location.search=params.toString();
};

export const getQuery=()=>{

}

export const removeQuery = (...queryNames) => {
  
};