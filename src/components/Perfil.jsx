import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actualizarUsuarioAccion, editarFotoAccion} from '../redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)

    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = React.useState(false)
    const [error, setError] = React.useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = ()=> {

        if(!nombreUsuario.trim()){
            console.log('Nombre vacio')
            return
        }

        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }

    const seleccionarArchivo = imagen => {
        const imagenCliente = imagen.target.files[0]

        if(imagenCliente === undefined){
            console.log('No se selecciono imagen')
            return
        }

        if(imagenCliente.type === 'image/png' || imagenCliente.type === 'image/jpg' || imagenCliente.type === 'image/jpeg'){
            dispatch(editarFotoAccion(imagenCliente))

            setError(false)
        }else{
            setError(true)
        }
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">

                <div className="card-body">
                    <img src={usuario.photoURL} alt="" className="img-fluid"/>
                    <h5 className="card-title mt-3">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button className="btn btn-dark btn-sm mb-2" onClick={()=> setActivarFormulario(true)}>
                        Editar nombre
                    </button>

                    {
                        error &&
                        <div className="alert alert-warning">
                            Solo imagenes del tipo .png, .jpg o .jpeg
                        </div>
                    }

                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            style={{display: 'none'}}
                            onChange={e => seleccionarArchivo(e)}
                            disabled={loading} />
                        <label
                            className={loading ? 'btn btn-dark btn-sm' : 'btn btn-dark btn-sm disabled'}
                            htmlFor="inputGroupFile01">
                            Actualizar imagen
                        </label>
                    </div>

                </div>

                {
                    loading &&
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <strong>Loading...</strong>
                            <div className="spinner-border ml-3" role="status">
                            </div>
                        </div>
                    </div>
                }

                {
                    activarFormulario &&
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombreUsuario}
                                        onChange={e => setNombreUsuario(e.target.value)}/>
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-dark btn-sm"
                                            type="button"
                                            onClick={()=> actualizarUsuario()}>
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Perfil
