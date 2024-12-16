import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { fetchProfile, updateProfile } from '../../Actions/admin.js';
import DefaultProfile from '../../Images/default-profile.png';

function Profile({ theme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(useSelector((data) => data.admin));

  const handleChange = (e) => {
    setAdmin({
      ...admin, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(fetchProfile());
  }, [location, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ admin: admin }));
    navigate('/profile')
  }

  const birthDate = new Date(admin.birthday);
  const admin_birthdate = `${birthDate.getFullYear()}-${((birthDate.getMonth() + 1) < 10) ? `0${birthDate.getMonth() + 1}` : birthDate.getMonth() + 1}-${(birthDate.getDate() < 10) ? `0${birthDate.getDate()}` : birthDate.getDate()}`;
  console.log(admin_birthdate);

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className={`card bg-${theme.color} text-${theme.text} col-md-5`}>
        <img src={(admin.image !== "") ? admin.image : DefaultProfile} className="card-img-top" alt={admin.name} />

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <h5 className="card-title">Admin</h5>
            <table width="100%" cellPadding={4}>
              <tr>
                <th>Image</th>
                <td><FileBase type="file" multiple={false} onDone={({ base64 }) => setAdmin({ ...admin, image: base64 })}></FileBase></td>
              </tr>
              <tr>
                <th>Name</th>
                <td><input className="form-control" type="text" name="name" value={admin.name} onChange={handleChange}></input></td>
              </tr>
              <tr>
                <th>Email</th>
                <td><input className="form-control" type="text" name="name" value={admin.email} onChange={handleChange}></input></td>
              </tr>
              <tr>
                <th>Mobile No.</th>
                <td><input className="form-control" type="number" name="name" value={admin.phone} onChange={handleChange}></input></td>
              </tr>
              <tr>
                <th>Birth Date</th>
                <td><input className="form-control" type="date" name="birthday" value={admin_birthdate} onChange={handleChange}></input></td>
              </tr>
            </table>
            <div className="d-flex justify-content-center mt-3">
              <button type='submit' className={`btn btn-${(theme.text === 'white' ? 'light' : 'dark')} px-4`}>UPDATE</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default Profile
