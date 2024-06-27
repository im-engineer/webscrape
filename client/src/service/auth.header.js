export const getUserInfo = () => {
    let company = JSON.parse(localStorage.getItem('companies'));
    console.log(company)
    return company;
 }