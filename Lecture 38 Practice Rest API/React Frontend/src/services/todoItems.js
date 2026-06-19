export const addItemsToServer = async (task, date) => {
    const response = await fetch('http://localhost:3000/api/todo',
        {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({task, date}),

        })
    return response.json();
}