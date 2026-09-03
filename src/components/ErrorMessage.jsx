function ErrorMessage({ error }) {

    if (!error) return null;

    return (
        <p className="text-red-500 text-2xl">
            {error}
        </p>
    );
}

export default ErrorMessage;