// import { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import styles from "./code/normalize.css"
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
            <header className={styles.head}>
                <div className="head__contenedor">
                    <div className="head__logo">
                        <img src="../nuevajunta/code/logo.png" alt="racingcargo-logo" />
                    </div>
                </div>
            </header>


            <div id="minuta">
                <div className="minuta__contenedor">
                    <div className="minuta__header">

                        <div className="minuta__campos">
                            <label htmlFor="minuta"># Minuta</label>
                            <input type="text" id="numeroMinuta" />
                        </div>

                        <div className="minuta__campos">
                            <label htmlFor="fecha">Fecha</label>
                            <input type="datetime-local" id="fechaMinuta" />
                        </div>

                        <div className="minuta__campos">
                            <label htmlFor="encargadoMinuta">Encargado de Minuta</label>
                            <input type="text" id="encargadoMinuta" />
                        </div>

                        <div className="minuta__campos">
                            <label htmlFor="estatus">Estatus de Minuta</label>
                            <select name="estatus" id="estatus">
                                <option value="estatusOpcion">Pendiente</option>
                                <option value="estatusOpcion">En Progreso</option>
                                <option value="estatusOpcion">Completada</option>
                            </select>
                        </div>

                        <div className="minuta__campos">
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea className="txArea" name="descripcion" id="descripcion" cols="30" rows="10"></textarea>

                        </div>



                    </div>

                    <div className="asignarTaera">
                        <form className="asignarTaera__formulario" action="" method="post" id="agregarTarea">
                            <div className="asignarTaera__grid">

                                <div className="asignarTaera__campo">
                                    <label for="tarea">Tarea</label>
                                    <textarea className="txArea" name="tarea" id="tarea" cols="30" rows="10" placeholder="Escribe una tarea..." maxlength="90"></textarea>
                                </div>


                                <div className="asignarTaera__campo">
                                    <label for="fechaCompromiso">Fecha Compromiso</label>
                                    <input type="date" id="fechaCompromiso"/>
                                </div>

                                <div className="asignarTaera__campo">
                                    <label for="asignado">Asignar</label>
                                    <select className="asignarTarea__input" id="asignadoId">
                                        <option className="asignarTarea__option">Alan Chávez</option>
                                        <option className="asignarTarea__option">Antonio Gonzalez</option>
                                        <option className="asignarTarea__option">Enrique Cristerna</option>
                                        <option className="asignarTarea__option">Miguel Morales</option>
                                        <option className="asignarTarea__option">Javier Huitrón</option>
                                    </select>
                                </div>

                                <div className="asignarTaera__campo">
                                    <label for="estatus">Status</label>
                                    <select className="asignarTarea__input" id="statusId">
                                        <option className="asignarTarea__option">Pendiente</option>
                                        <option className="asignarTarea__option">En Progreso</option>
                                        <option className="asignarTarea__option">Completado</option>
                                    </select>
                                </div>


                                <div className="asignarTaera__campo insertarAlerta" id="insertarAlerta"></div>

                                <button type="submit" className="btnTarea asignarTaera__campo" >Agregar</button>
                            </div>
                        </form>
                    </div>




                    <div className="minuta">
                        <div className="minuta__info">
                            <div className="minuta__campo">

                            </div>
                        </div>
                        <div className="tareasAsignadas">
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
