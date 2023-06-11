import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import TitleBanner from "src/components/TitleBanner";

export default function userBooking() {
    return (
        <>
            <NavBar/>
            <div className="container">
                <TitleBanner marginBotton={'40px'} padding={'7'} title={"Bookings"} />
                <table className="table table-bordered table-hover transaction">
                    <thead className="thead-dark">
                        <tr style={{ backgroundColor: "#38325059" }}>
                            <th scope="col">Booking Id</th>
                            <th scope="col">Guest Name</th>
                            <th scope="col">Roomcategory</th>
                            <th scope="col">Payment Id</th>
                            <th scope="col">Arrival Dt</th>
                            <th scope="col">Departure Dt</th>
                            <th scope="col">Parking</th>
                            <th scope="col">Guests</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1234</th>
                            <td>Arpita Mishra</td>
                            <td>Deluxe</td>
                            <td><a href='/admin/finance'>500</a></td>
                            <td>01June,2023</td>
                            <td>05June,2023</td>
                            <td>
                                No
                            </td>
                            <td>2</td>
                            <td>
                                <button className="delete">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1234</th>
                            <td>Arpita Mishra</td>
                            <td>Deluxe</td>
                            <td>500</td>
                            <td>01June,2023</td>
                            <td>05June,2023</td>
                            <td>No</td>
                            <td>2</td>
                            <td>
                                <button className="delete">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
            <Footer />
        </>
    )
}