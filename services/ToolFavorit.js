export const favoriteToolServices = async (studentId, toolId) => {
    try {
        const foundStudent = await Student.findById(studentId);
        if (!foundStudent) {
            throw new Error("Student not found");
        }

        if (!foundStudent.favorites) {
            foundStudent.favorites = [];
        }

        if (foundStudent.favorites.includes(toolId)) {
            foundStudent.favorites = foundStudent.favorites.filter(
                (favId) => favId.toString() !== toolId
            );
            await foundStudent.save();
            return "Tool removed from favorites";
        } else {
            foundStudent.favorites.push(toolId);
            await foundStudent.save();
            return "Tool added to favorites";
        }
    } catch (error) {
        throw new Error(error.message);
    }
};