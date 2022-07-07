import React from 'react';
import { Modal , Button , Form } from 'react-bootstrap';
import { useForm , useFormState } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';



const Login = React.memo((props) => {
	let { modalClose , setCredentials } = props;

	const { register , handleSubmit , control , formState: { errors , isValid } } = useForm({ mode : 'onChange' , defaultValues : { fullname : null , email : null , password : null , organisation : null , note : null } });
    const { dirtyFields } = useFormState({ control });

    const onSubmit = handleSubmit( (data) => {
        return new Promise( (resolve, reject) => {
	        (() => {
	        	setCredentials(data);
	        	resolve();
	        })();
        } );
    } );
    
    return (
        <>
            <Modal.Header>
                <Modal.Title>Login to Lumi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            	<form onSubmit={ onSubmit }>
            		<Form.Group className="mb-3" controlId="fullname">
            			<Form.Control type="text" { ...register('fullname', { required: 'This field is required.' }) } placeholder="Full name*" />
            			<ErrorMessage errors={ errors } name="fullname" as={ <p className="invalid-feedback" /> } />
            		</Form.Group>
            		<Form.Group className="mb-3" controlId="email">
            			<Form.Control type="email" { ...register('email', { required: 'This field is required.' }) } placeholder="Email*" />
            			<ErrorMessage errors={ errors } name="email" as={ <p className="invalid-feedback" /> } />
            		</Form.Group>

            		<Form.Group className="mb-3" controlId="password">
            			<Form.Control type="password" { ...register('password', { required: 'This field is required.' , minLength: { value: 6, message: 'This field expects a minumum of 6 characters.' } }) } placeholder="Password*" />
            			<ErrorMessage errors={ errors } name="password" as={ <p className="invalid-feedback" /> } />
            		</Form.Group>

            		<Form.Group className="mb-3" controlId="organisation">
            			<Form.Control type="text" { ...register('organisation', { required: 'This field is required.' }) } placeholder="Organisation name*" />
            			<ErrorMessage errors={ errors } name="organisation" as={ <p className="invalid-feedback" /> } />
            		</Form.Group>

            		<Form.Group className="mb-3" controlId="note">
            			<Form.Control as="textarea" { ...register('note') } placeholder="Add a Note" />
            			<ErrorMessage errors={ errors } name="note" as={ <p className="invalid-feedback" /> } />
            		</Form.Group>

            		<Form.Group className="mb-3" controlId="note">
            			<Form.Text className="text-muted">* Required fields</Form.Text>
            		</Form.Group>

		            <div className="d-flex align-items-center justify-content-center mt-5">
		                <Button className="mx-2 px-4" variant="secondary" onClick={ modalClose }>
		                    Cancel
		                </Button>
		                <Button type="submit" className="mx-2 px-4" variant="primary" disabled={ ((Object.keys(dirtyFields).length == 0) || (isValid != true)) }>
		                    Submit
		                </Button>
		            </div>
		        </form>
            </Modal.Body>
        </>
    );
});

export default Login;