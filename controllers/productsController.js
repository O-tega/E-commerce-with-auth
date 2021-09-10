// import multer
const { create } = require("domain");
const multer = require("multer");
//=================================Importing base modules==============================
// import path
const path = require("path");

//================================== Importing your models=============================
const Product = require("../models/Products");

// using multer to create file for upload
const storage = multer.diskStorage({
	destination: (
		req,
		file,
		callback
	) => {
		callback(
			null,
			"uploads/product_img/"
		);
	},
	filename: (req, file, callback) => {
		callback(
			null,
			`${Date.now()}-${
				file.originalname
			}`
		);
	},
});

const uploads = multer({
	storage,
	limits: { fileSize: 1000000000000 },
	fileFilter: (req, file, callback) => {
		extname = path
			.extname(file.originalname)
			.toLowerCase();
		if (
			extname === ".jpg" ||
			extname === ".png" ||
			extname === ".jpeg" ||
			extname === ".txt"
		) {
			return callback(null, true);
		}
		return callback(
			new Error("file not supported"),
			false
		);
	},
}).single("file");

exports.getAllProducts = async (
	req,
	res,
	next
) => {
	try {
		const product =
			await Product.find();
		res.render(
			"products/productlist.ejs",
			{
				title: "Product List",
				product,
				server_url: req.server_url,
			}
		);
	} catch (error) {
		next(error);
	}
};

exports.createProduct = (
	req,
	res,
	next
) => {
	res.render("products/create.ejs", {
		title: "create product",
		server_url: req.server_url,
	});
};

exports.postCreate = async (
	req,
	res,
	next
) => {
	try {
		uploads(req, res, async (err) => {
			if (err) {
				return next("ERROR: ", err);
			}
			const data = {
				...req.body,
				product_img: req.file.filename
					? `/uploads/product_img/${req.file.filename}`
					: "/uploads/product_img/dummy-image-testimonial-300x298-1.jpg",
			};
			const product =
				await Product.create(data);
			res.redirect("/products");
		});
	} catch (error) {
		next(error);
	}
};

exports.singleProduct = async (
	req,
	res,
	next
) => {
	try {
		const id = req.params.id;
		const product =
			await Product.findById({
				_id: id,
			});
		res.render("products/single", {
			title: "Single product",
			product,
			server_url: req.server_url,
		});
	} catch (error) {
		next(error);
	}
};

exports.editProduct = async (
	req,
	res,
	next
) => {
	try {
		const id = req.params.id;
		const product =
			await Product.findById({
				_id: id,
			});
		res.render("products/Edit.ejs", {
			title: "Edit Products",
			product,
			server_url: req.server_url,
		});
	} catch (error) {
		next(error);
	}
};

exports.patchProduct = async (
	req,
	res,
	next
) => {
	try {
		// const data = {
		// 	...req.body,
		// 	product_img: req.file.filename
		// 			? (`/uploads/product_img/${req.file.filename}`)
		// 			: ("/uploads/product_img/dummy-image-testimonial-300x298-1.jpg"),

		// }
		const product =
			await Product.findByIdAndUpdate(
				{ _id: req.body.productId },
				req.body,
				{
					new: true,
				}
			);
		res.redirect(
			`/products/${product._id}`
		);
	} catch (error) {
		next(error);
	}
};
