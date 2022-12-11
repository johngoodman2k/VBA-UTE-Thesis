//import { TournamentContainer } from "../components/TournamentContainer";
// import { CreateTournamentContainer } from '../components/CreateTournamentContainer';
// import { CreateTournamentHeading } from '../components/CreateTournamentHeading';
import React, { useState } from "react";
// import UploadAndDisplayImage from '../components/UploadandDisplayImage';
import { ReactComponent as Close } from "../../../assets/svg/close-com.svg";
import { validate } from "./validate";
// import { TournamentHeading } from '../components/TournamentHeading';
// import { TournamentButtonGroup } from '../components/TournamentButtonGroup';
// import { TournamentType } from '../components/TournamentType';
import { ButtonGroup } from "../../Button/ButtonGroup";
import { Type } from "../../Button/Type";
import classNames from "classnames/bind";
import styles from "./createTournament.module.scss";
import { ModalBlock } from "../ModalBlock";
import { vbaContext } from "../../../Services/services";
import toastNotify from "../../../utils/toast";
const cx = classNames.bind(styles);
type createTournamentProps = {
    handleCloseModal?: () => void;
};

const typeOptions = [
    {
        name: "Eliminate",
        image: "https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg",
        value: "eliminate",
    },
    {
        name: "Round Robin",
        image: "https://www.interbasket.net/wp-content/uploads/14-team-bracket-single-elimination.jpg",
        value: "roundrobin",
    },
];

const ButtonOptions = [
    { name: "One", value: "one" },
    { name: "Double", value: "double" },
];

const getTournamentServices = vbaContext.getTournamentServices();

export const CreateTournamentModal = (props: createTournamentProps) => {
    // const [statusState, setStatusState] = useState("active");
    const [tournamentType, setTournamentType] = useState<string>("");
    const [competitor, setCompetitor] = useState<string>("");

    //Create TOURNAMENT
    const createTournament = async (e: any) => {
        e.preventDefault();
        // const id = e.target.id.value;
        const name = e.target.name.value;
        const description = e.target.description.value;
        const startDate = e.target.startdate.value;
        const endDate = e.target.enddate.value;
        const type = tournamentType;
        const newCompetitor = competitor;
        const validata = validate(name, newCompetitor, startDate, endDate, description, type);
        console.log(validata);

        try {
            if (validata) {
                const res = await getTournamentServices.createTournament(validata);
                toastNotify("Create tournament is successfully", "success");
            }
        } catch (e) {
            console.log("this is error tournament create ", e);
        }
    };

    return (
        <>
            {/* <TournamentContainer>
        <h1>Create Tournament</h1>
      </TournamentContainer> */}
            <ModalBlock>
                <div className="container text-center m-auto ">
                    <div className={`${cx("panel")}`}>
                        <header className={`${cx("createtournament_type-header")}`}>
                            <div className="container flex justify-center items-center ">
                                <h1 className="text-2xl font-bold text-white uppercase ">Create Tournament</h1>
                                <div className="ml-auto text-right hover:cursor-pointer">
                                    <Close onClick={props.handleCloseModal} className="w-[48px] h-[48px]"></Close>
                                </div>
                            </div>
                        </header>
                        <div className={`${cx("createtournament-body")}`}>
                            <form onSubmit={createTournament}>
                                <div
                                    className={`${cx(
                                        "createtourament-body-adjust",
                                        "createtournament_row-wrapper",
                                        "grid grid-cols-2",
                                        "text-left"
                                    )}`}
                                >
                                    <div className="w-full pr-4">
                                        {/* <div className='my-2'>
											<p className={`${cx('createtournament_text-adjust')}`}>ID</p>
											<input className={`${cx('createtournament_input')}`} type='text' name='id' />
										</div> */}
                                        <div className="my-2">
                                            <p className={`${cx("createtournament_text-adjust")}`}>Name</p>
                                            <input
                                                className={`${cx("createtournament_input")}`}
                                                type="text"
                                                name="name"
                                            />
                                        </div>
                                        <div className="mb-4 w-full">
                                            <p className={`${cx("createtournament_text-adjust")}`}>Competitors type</p>
                                            <ButtonGroup buttons={ButtonOptions} getValue={setCompetitor}></ButtonGroup>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="my-2">
                                            <p className={`${cx("createtournament_text-adjust")}`}>Start Date</p>
                                            <input
                                                className={`${cx("createtournament_input-date")}`}
                                                type="datetime"
                                                name="startdate"
                                            />
                                        </div>
                                        <div className="my-2">
                                            <p className={`${cx("createtournament_text-adjust")}`}>End Date</p>
                                            <input
                                                className={`${cx("createtournament_input-date")}`}
                                                type="datetime"
                                                name="enddate"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${cx("createtournament_row-wrapper")}`}>
                                    <div className={`${cx("position-adjust")}`}>
                                        <h1 className={`${cx("createtournament_text-desc")}`}>Description</h1>
                                        <textarea
                                            className={`${cx("createtournament_textarea")}`}
                                            name="description"
                                            rows={6}
                                            cols={50}
                                            placeholder="Write something ... "
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="">
                                    <label className={`${cx("createtournament_type-header")}`}>Choose your type</label>
                                    <div className={`${cx("createtournament_type-block")}`}>
                                        <Type type={typeOptions} getValue={setTournamentType}></Type>
                                    </div>
                                </div>

                                <div className={`${cx("createTournamentButton-block")}`}>
                                    <button
                                        type="submit"
                                        className={`${cx("position-adjust", "createTournamentButton-adjust")}`}
                                    >
                                        <span>Submit!</span>
                                        <span className={cx("__block__icon", "w-[15px]", "h-[14px]")}>
                                            <img
                                                className={`${cx("__block__icon--adjust")}`}
                                                src="https://www.freeiconspng.com/uploads/right-arrow-icon-12.png"
                                                alt=""
                                            />
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalBlock>
        </>
    );
};
