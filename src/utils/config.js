export const API_URL = "http://192.168.1.3:5000/api/";

export const LOGIN_URL = API_URL + "authenticate"; // POST
export const POPS_URL = API_URL + "duties"; // GET
export const POP_URL = API_URL + "pops/"; // + pop_id // GET
export const POPS_SWAP_URL = API_URL + "duties"; // PATCH
export const POP_DELETE_URL = API_URL + "duty"; // DELETE
export const POP_GET_USERS = API_URL + "dutyUsers"; // GET
export const POP_TOGGLE_URL = API_URL + "dutyToggle"; // + user_id // PATCH
export const EXPENSES_GROUPS_URL = API_URL + "expense-groups"; // GET
export const EXPENSES_URL = API_URL + "expenses"; // GET
export const EXPENSES_ADD_URL = API_URL + "expense/"; // POST
