const studentlistValidation = (req, res, next) => {
    const { name, dob, email, gender } = req.body;

    if (!name || !dob || !email || !gender ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    next(); // Proceed to controller
};

// module.exports=studentlistValidation