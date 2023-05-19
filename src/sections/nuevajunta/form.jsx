// import { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

const MyPage = () => {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Nueva Minuta</title>
                <Link rel="stylesheet" href="../nuevajunta/code/normalize.css" />
                <Link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* crossorigin */}
                <Link rel="preconnect" href="https://fonts.gstatic.com"></Link>
                <Link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;700&display=swap"
                    rel="stylesheet"
                />
                <Script src="https://kit.fontawesome.com/c420906ffa.js" crossOrigin="anonymous"></Script>
                <Link rel="stylesheet" href="../nuevajunta/code/nueva_minuta.css" />
            </Head>
            <header>
                <div >
                    <div >
                        <img src="../nuevajunta/code/logo.png" alt="racingcargo-logo" />
                    </div>
                </div>
            </header>


            <div id="minuta">
                <div >
                    <div >

                        <div >
                            <label htmlFor="minuta"># Minuta</label>
                            <input type="text" id="numeroMinuta" />
                        </div>

                        <div >
                            <label htmlFor="fecha">Fecha</label>
                            <input type="datetime-local" id="fechaMinuta" />
                        </div>

                        <div >
                            <label htmlFor="encargadoMinuta">Encargado de Minuta</label>
                            <input type="text" id="encargadoMinuta" />
                        </div>

                        <div >
                            <label htmlFor="estatus">Estatus de Minuta</label>
                            <select name="estatus" id="estatus">
                                <option value="estatusOpcion">Pendiente</option>
                                <option value="estatusOpcion">En Progreso</option>
                                <option value="estatusOpcion">Completada</option>
                            </select>
                        </div>

                        <div >
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea  name="descripcion" id="descripcion" cols="30" rows="10"></textarea>

                        </div>



                    </div>

                    <div >
                        <form  action="" method="post" id="agregarTarea">
                            <div >

                                <div >
                                    <label for="tarea">Tarea</label>
                                    <textarea  name="tarea" id="tarea" cols="30" rows="10" placeholder="Escribe una tarea..." maxlength="90"></textarea>
                                </div>


                                <div >
                                    <label for="fechaCompromiso">Fecha Compromiso</label>
                                    <input type="date" id="fechaCompromiso"/>
                                </div>

                                <div >
                                    <label for="asignado">Asignar</label>
                                    <select  id="asignadoId">
                                        <option >Alan Chávez</option>
                                        <option >Antonio Gonzalez</option>
                                        <option >Enrique Cristerna</option>
                                        <option >Miguel Morales</option>
                                        <option >Javier Huitrón</option>
                                    </select>
                                </div>

                                <div >
                                    <label for="estatus">Status</label>
                                    <select  id="statusId">
                                        <option >Pendiente</option>
                                        <option >En Progreso</option>
                                        <option >Completado</option>
                                    </select>
                                </div>


                                <div  id="insertarAlerta"></div>

                                <button type="submit"  >Agregar</button>
                            </div>
                        </form>
                    </div>




                    <div >
                        <div >
                            <div>

                            </div>
                        </div>
                        <div >
                            <h2>Tareas Agregadas</h2>
                            <div id="tareasAsignadas"></div>
                        </div>
                    </div>

                </div>
            </div>
            <Script src="../nuevajunta/code/nueva_minuta.js"></Script>
        </div>
    );
};

export default MyPage;
