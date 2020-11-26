const db = require('../db');

/* about request, parse json object follow this format:
{
	symptoms: [disease1, disease2, disease3, ..., diseaseN]
}
*/
exports.listDiseases = async function(req, res) {
	try {
		console.log(req.body.symptoms)
		let arr = req.body.symptoms
		if (!arr || arr.length == 0) res.status(500).json({successfuly_list_diseases: false})
		
		let queryString = "select ds1.disease_id from symptoms s, "
		for (let i=1; i<=arr.length; i++) {
			if (i == arr.length) queryString += " diseases_symptoms ds" + i + "\n"
			else queryString += "diseases_symptoms ds" + i + ","
		}
		
		// where ds1 = ds2, etc.
		queryString += "where s.id = ds1.symptom_id"
		for (let i=2; i<=arr.length; i++) {
			if (i == arr.length) queryString += "\nand ds" + i + ".disease_id = ds1.disease_id"
			else queryString += "\nandds" + i + ".disease_id = ds1.disease_id,"
		}
		
		// and part
		for (let i=0; i<arr.length; i++) {
			queryString += "\nand s.name = " + "'" + arr[i] + "'"
		}
		console.log(queryString)
		
		
	} catch (err) {
		console.log(err)
	}
}

