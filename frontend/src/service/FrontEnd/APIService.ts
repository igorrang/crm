export const getData = async (url: string ) => {
    const response = await fetch(`/api/${url}`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }
    return response.json()
}


export const patchData = async (data: any, url:string) => {
    const response = await fetch(`/api/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'failed to patch data')
    }
    return response.json()
}

export const postData = async (data: any, url:string) => {
    const response = await fetch(`app/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'failed to post data')
    }
    return response.json()
}

export const putData = async (data: any, url:string) => {
    const response = await fetch(`/api/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'failed to put data')
    }
    return response.json()
}

export const deleteData = async (data:string , url:string) => {
    const response = await fetch(`/api/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'failed to delete data')
    }
    return response.json()
}