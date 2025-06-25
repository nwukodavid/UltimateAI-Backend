// Simple register function (you can replace with real logic later)
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TEMP: Just respond with a success message
    res.status(200).json({
      success: true,
      message: "User registered successfully!",
      data: { email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
