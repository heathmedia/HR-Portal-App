function PrimarySubmitButton({ value }) {
    return (
        <input type="submit" value={value}
            className="cursor-pointer bg-primary hover:bg-blue-700 
                text-white font-bold rounded-full px-3 py-1.5 mr-4 mb-3" />
    )
}

export default PrimarySubmitButton