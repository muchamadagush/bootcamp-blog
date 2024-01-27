const get = (dataResponse) => {
    const {
        message = 'Data sudah diterima',
        code = 200,
        ...rest
    } = dataResponse

    return {
        code,
        message,
        ...rest
    }
}

const create = (dataResponse) => {
    return {
        code: 201,
        message: 'Data berhasil dibuat',
        ...dataResponse
    }
}

module.exports = {
    get,
    create
}