import { useSelector } from "react-redux";
export const ShowAllInvitedTrue = () => {
    let listTrue = []
    let sumnumGirlsDto=0
    let sumnumBoysDto = 0
    let sumnumDaughterAdultsDto = 0
    let sumnumSonAdultsDto = 0
    let sumnumTeenageGirlsDto = 0
    let sumnumteenageBoysDto = 0

    let list = useSelector(n => n.ListInvitedReducer.list)
   
    for (let index = 0; index < list.length; index++) {
        if (list[index].isComeDto==true)
        listTrue.push(list[index]);   
    }
    console.log(listTrue)
    for (let x = 0; x < listTrue.length; x++) {
        const element = listTrue[x];
        sumnumGirlsDto += Number(element.numGirlsDto)
        sumnumBoysDto += Number(element.numBoysDto)
        sumnumDaughterAdultsDto += Number(element.numDaughterAdultsDto)
        sumnumSonAdultsDto += Number(element.numSonAdultsDto)
        sumnumTeenageGirlsDto +=Number(element.numTeenageGirlsDto)
        sumnumteenageBoysDto += Number(element.numteenageBoysDto)
        
    }
    return <>
        <div>כמות ילדות{sumnumGirlsDto}</div>
        <div>כמות ילדים{sumnumBoysDto}</div>
        <div>כמות מבוגרות{sumnumDaughterAdultsDto}</div>
        <div>כמות מבוגרים{sumnumSonAdultsDto}</div>
        <div>כמות נערים{sumnumteenageBoysDto}</div>
        <div>כמות נערות{sumnumTeenageGirlsDto}</div>
        {listTrue.map(x => (
            <div className="container" key={x}>


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
                                            <h5 className="text-center ">{x.fName} {x.lName}</h5>
                                            <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                {/* <li className="mr-md-4">
                                                    <i className="zmdi zmdi-pin mr-2"></i> {x.emailInvitedDto}
                                                </li> */}
                                                <li className="mr-md-4">
                                                    <i className="zmdi zmdi-money mr-2"></i>{x.numGirlsDto}: מספר ילדות 
                                                </li>
                                                <li className="mr-md-4">
                                                    <i className="zmdi zmdi-time mr-2"></i> {x.numBoysDto}: מספר ילדים 
                                                </li>
                                                <li className="mr-md-4">
                                                    <i className="zmdi zmdi-time mr-2"></i> {x.numDaughterAdultsDto}: מספר מבוגרות
                                                </li>
                                                 <li className="mr-md-4">
                                                    <i className="zmdi zmdi-time mr-2"></i> {x.numSonAdultsDto}: מספר מבוגרים 
                                                </li>
                                                <li className="mr-md-4">
                                                    <i className="zmdi zmdi-time mr-2"></i> {x.numTeenageGirlsDto}: מספר נערות
                                                </li>
                                                <li className="mr-md-4">
                                                    <i className="zmdi zmdi-time mr-2"></i> {x.numteenageBoysDto}: מספר נערים
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>
                </div>

            </div>
        ))
        }
    </>
}