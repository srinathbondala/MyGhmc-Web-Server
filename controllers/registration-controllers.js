const Admin=require("../models/admin")
const Driver=require("../models/driver")
const Profile=require("../models/profile");
const houseregister = async (req, res, next) => {
    const { nameOwner, phnNo, buildingName, hosuePlotNo, units, comercialUnits, residentialUnits, zone, circle, ward } = req.body.data;
    console.log(nameOwner, phnNo, buildingName, hosuePlotNo, units, comercialUnits, residentialUnits, zone, circle, ward);


    try {
        const house = await Profile.findOne({ plot_no: hosuePlotNo});

        if (house) {
            console.log('Found user:', house);
            return res.status(201).json({ message: "The profile already exists" });
        } else {
            // console.log('User not found.');
            const profile = new Profile({
                name_of_owner: nameOwner.toUpperCase(),
                contact_no: phnNo,
                building_name: buildingName.toUpperCase(),
                plot_no: hosuePlotNo.toUpperCase(),
                total_units: units,
                comercial_units: comercialUnits,
                residential_units: residentialUnits,
                zone:zone.toUpperCase(),
                circle,
                ward
            });

            try {
                await profile.save();
                return res.status(201).json({ message: "The profile has been created" });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving profile" });
            }
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: "Error finding user" });
    }
};

// const register = async(req,res,next)=>{
//     const {nameOwner,phnNo,buildingName,hosuePlotNo,units,comercialUnits, residentialUnits, zone,circle,ward}=req.body.data;
//     console.log( nameOwner,phnNo,buildingName,hosuePlotNo,units,comercialUnits, residentialUnits, zone,circle,ward,zone,circle,ward);
    
//     const desiredUsername = 'example_username';

//     User.findOne({ username: desiredUsername })
//     .then(user => {
//         if (user) {
//             console.log('Found user:', user);
//             return res.status(201).json({message:"The profile already exsits"});
//         } else {
//             // console.log('User not found.');
//             const profile= new Profile({
//                 name_of_owner:nameOwner,
//                 contact_no:phnNo,
//                 building_name:buildingName,
//                 plot_no:hosuePlotNo,
//                 total_units:units,
//                 comercial_units:comercialUnits,
//                 residential_units:residentialUnits,
//                 zone,
//                 circle,
//                 ward
//             })
//             try{
//                 await profile.save();
//             }catch(err)
//             {
//                 console.log(err);
//             }
//             return res.status(201).json({message:"The profile has been created"});
//         }
//     })
//     .catch(error => {
//         console.error('Error finding user:', error);
//     });

    
    // const profile= new Profile({
    //     name_of_owner:nameOwner,
    //     contact_no:phnNo,
    //     building_name:buildingName,
    //     plot_no:hosuePlotNo,
    //     total_units:units,
    //     comercial_units:comercialUnits,
    //     residential_units:residentialUnits,
    //     zone,
    //     circle,
    //     ward
    // })
    // try{
    //     await profile.save();
    // }catch(err)
    // {
    //     console.log(err);
    // }
    // return res.status(201).json({message:"The profile has been created"});
// }
const driverregister = async (req, res, next) => {
    const {name,phnNo,sfiNo,vehicleNo,password } = req.body.data;
    console.log(name,phnNo,sfiNo,vehicleNo,password);


    try {
        const driver = await Driver.findOne({ sfi_no: sfiNo.toUpperCase()});

        if (driver) {
            console.log('Found user:', driver);
            return res.status(201).json({ message: "The profile already exists" });
        } else {
            // console.log('User not found.');
            const driver = new Driver({
                name_of_driver:name.toUpperCase(),
                contact_no: phnNo,
                sfi_no: sfiNo.toUpperCase(),
                vehicle_no: vehicleNo.toUpperCase(),
                password
            });

            try {
                await driver.save();
                return res.status(201).json({ message: "The profile has been created" });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving profile" });
            }
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: "Error finding user" });
    }
};


const adminregister = async (req, res, next) => {
    const {name,phnNo,empid,password } = req.body.data;
    console.log(name,phnNo,empid,password);


    try {
        const admin = await Admin.findOne({ emp_id: empid.toUpperCase()});
        if (admin) {
            console.log('Found user:', admin);
            return res.status(201).json({ message: "The profile already exists" });
        } else {
            // console.log('User not found.');
            const admin = new Admin({
                name_of_admin:name.toUpperCase(),
                contact_no: phnNo,
                emp_id: empid.toUpperCase(),
                password
            });

            try {
                await admin.save();
                return res.status(201).json({ message: "The profile has been created" });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving profile" });
            }
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: "Error finding user" });
    }
};


exports.adminregister=adminregister;
exports.driverregister=driverregister;
exports.houseregister=houseregister;