module.exports = (sequelize, DataTypes) => {
	const customer = sequelize.define("customer", {

		id_customer : {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},

		customer_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			isAlphanumeric:true,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique:true,
			isEmail:true,
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

        profile_image: {
            type: DataTypes.BLOB('long'),
        }

	});
    
	return customer;
};
