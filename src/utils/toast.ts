import iziToast from 'izitoast'

const config = {
    titleSize: '30px',
    messageSize: '30px',
    titleLineHeight: '1.5',
    messageLineHeight: '1.5',
    timeout: 5000
}

const toast = {
    success(message = "", title = 'Success', position = "bottomRight") {
        iziToast.success({
            title,
            message,
            position,
            ...config
        })
    },
    error(message = "", title = 'Error', position = "bottomRight") {
        iziToast.error({
            title,
            message,
            position,
            ...config
        })
    },
    info(message = "", title = 'Info', position = "bottomRight") {
        iziToast.info({
            title,
            message,
            position,
            ...config
        })
    },
    warning(message = "", title = 'Warn', position = "bottomRight") {
        iziToast.warning({
            title,
            message,
            position,
            ...config
        })
    },
}

export default toast
