export default async function getTours() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/tours`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to get tours");
    }
    return response.json();
}