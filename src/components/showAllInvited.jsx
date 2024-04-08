import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./showAllInvited.css"
import axios from "axios";
import { useLocation } from "react-router";
import { getList } from "../redux/action/listInvitedAction";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export const ShowAllInvited = () => {

    //משתנים
    let d = useDispatch();
    let params = useLocation();
    let obj = params.state;
    let myObj = useSelector(x => x.OwnerOfEventReducer.object)
    console.log("ShowAllInvited", obj);
    const [list, setList] = useState([])

    //בעת טעינת הדף
    useEffect(() => {
        axios.get(`https://localhost:44325/api/Functions/invitedToEventDtoList/${myObj.idEventDto}`).then((k) => {
            d(getList(k.data))
            update_list(k.data)
        }
        )
    }, [])

    //עדכון הרשימה של המוזמנים לארוע
    const update_list = (data) => {
        setList(data)
    }

    return <>
        {list.map(x => (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 5
                }}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    dir="rtl">
                    <Grid className="container" key={x}>
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="career-search mb-60">
                                    <div className="filter-result">
                                        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                                            <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                                                <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                    {x.fName[0]}{x.lName[0]}
                                                </div>
                                                <div className="job-content">
                                                    <h5 className="text-center text-md-left">{x.fName} {x.lName}</h5>
                                                    <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                        <li className="mr-md-4">
                                                            <i className="zmdi zmdi-pin mr-2"></i> {x.emailInvitedDto}
                                                        </li>
                                                        <li className="mr-md-4">
                                                            <i className="zmdi zmdi-money mr-2"></i>{x.idInvitedToEventDto} :מספר מוזמן
                                                        </li>
                                                        <li className="mr-md-4">
                                                            <i className="zmdi zmdi-time mr-2"></i> {x.isComeDto}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        ))
        }
    </>
}