/**
 * General purpose get roles from token 
 */
import { jwtDecode } from "jwt-decode";


export const getRolesFromToken = () => {
  const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage
  if (!token) return []; // If no token, return an empty array
  const decoded = jwtDecode(token); // Decode the JWT
  return decoded.roles || []; // Return roles or an empty array if roles are not present

};
