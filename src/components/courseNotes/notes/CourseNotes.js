import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import LoginModal from '../../auth/LoginModal'
import { getNotes, deleteNotes } from '../../../redux/notes/notes.actions'
import { saveDownload } from '../../../redux/downloads/downloads.actions'
import img from '../../../images/resourceImg.svg'
import DeleteIcon from '../../../images/remove.svg';
import AddNotesModal from './AddNotesModal'
import EditNotesModal from './EditNotesModal'
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const CourseNotes = ({ auth, chapter, getNotes, deleteNotes, saveDownload, notes }) => {

    useEffect(() => {
        getNotes()
    }, [getNotes])

    const onDownload = (note) => {
        const newDownload = {
            notes: note._id,
            chapter: note.chapter,
            course: note.course,
            courseCategory: note.courseCategory,
            downloaded_by: auth.user ? auth.user._id : null
        }
        saveDownload(newDownload)
    }

    return (

        auth.isAuthenticated ?

            notes.isLoading ?
                <ReactLoading type="spinningBubbles" color="#33FFFC" /> :

                <>
                    {auth.user.role !== 'Visitor' ?
                        <Row>
                            <Button size="sm" outline color="danger" className="ml-auto mr-1 mx-sm-auto my-2 add-notes-btn">
                                <strong><AddNotesModal auth={auth} chapter={chapter} /></strong>
                            </Button>
                        </Row> : null}

                    <Row>
                        {notes && notes.allNotes.map(note =>

                            note.chapter === chapter._id ?

                                <Col key={note._id} sm="12" className="mb-3 resouces-card c-notes">

                                    <Card className="d-flex flex-row p-1">
                                        <CardImg top width="100px" src={img} alt="Card image cap" className="pl-1" />
                                        <CardBody>

                                            <CardTitle tag="h6" className="text-info font-weight-bold mb-1">
                                                {note.title}
                                            </CardTitle>

                                            <CardSubtitle tag="small" className="mb-2 text-muted font-weight-bolder">
                                                {note.courseCategory.title}
                                            </CardSubtitle>

                                            <CardText className="mb-1">
                                                <small>{note.description}</small>
                                                <br />
                                                <i className="font-weight-bolder text-info" style={{fontSize: ".6rem"}}>
                                                    {note.notes_file.split('/').pop().replace(/%20|%5B|%5D/g, ' ')}
                                                </i>
                                            </CardText>

                                            <div className="action-btns">

                                                <Button size="sm" color="success" onClick={() => onDownload(note)}>
                                                    <a href={note.notes_file} className="text-white">Download</a></Button>

                                                {auth.user.role !== 'Visitor' ?
                                                    <><Button size="sm" color="link" className="mx-2">
                                                        <EditNotesModal idToUpdate={note._id} editTitle={note.title} editDesc={note.description} />
                                                    </Button>

                                                        <Button size="sm" color="link" className="mr-2" onClick={() => deleteNotes(note._id)}>
                                                            <img src={DeleteIcon} alt="" width="16" height="16" />
                                                        </Button></> : null}
                                            </div>

                                        </CardBody>
                                    </Card>
                                </Col> : null)}
                    </Row>
                </> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                        <LoginModal />
                }
            </div>)
}

const mapStateToProps = state => ({
    notes: state.notesReducer
})

export default connect(mapStateToProps, { getNotes, deleteNotes, saveDownload })(CourseNotes)