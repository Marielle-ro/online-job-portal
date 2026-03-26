import axios from "axios";

export async function fetchCategories() {
    try {
        const response = await axios.get("http://localhost:8089/categories");
        return response.data; // Returns a list of categories
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
