let getFontWeightAndSyle = (x) => {
    let value = x.toLowerCase();
    if (value === "italic") {
        return {
            fontWeight: 400,
            fontStyle: "italic",
        }
    } else if (value === "regular") {
        return {
            fontWeight: 400,
            fontStyle: "normal",
        }
    } else if (value.indexOf("italic") > 0) {
        return {
            fontWeight: value.substring(0, value.indexOf("italic")),
            fontStyle: "italic",
        }

    } else {
        return {
            fontWeight: value,
            fontStyle: "normal",
        }
    }
}

export { getFontWeightAndSyle }