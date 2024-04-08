import Swal from "sweetalert2";

export const error = (text) => {
    return show(text, 'error');
}

export const success = (text) => {
    return show(text, 'success');
}

const show = (text, type) => {
    return Swal.fire({
        title: text,
        icon: type == "success" ? 'success' : "error",
        showCancelButton: true,
        cancelButtonColor: '#b2c2bf',
        cancelButtonText: 'סגור'
    });
}

