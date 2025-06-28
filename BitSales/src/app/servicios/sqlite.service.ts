import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {
    this.inicializarDB();
  }

  async inicializarDB() {
    try {
      const db = await this.sqlite.create({
        name: 'bitsales.db',
        location: 'default',
      });

      this.dbInstance = db;

      // Tabla usuarios
      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT UNIQUE,
          correo TEXT,
          contrasena TEXT,
          direccion TEXT,
          fechaNacimiento TEXT
        );`,
        []
      );

      // Tabla perfil_usuario
      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS perfil_usuario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT,
          nombreCompleto TEXT,
          telefono TEXT,
          plataforma TEXT,
          categorias TEXT,
          descripcion TEXT,
          avatar TEXT,
          juegosSeguidos TEXT
        );`,
        []
      );

      console.log('✅ Tablas creadas con éxito');
    } catch (err) {
      console.error('❌ Error al crear la base de datos', err);
    }
  }

  async registrarUsuario(usuario: any): Promise<void> {
    if (!this.dbInstance) return;

    const { usuario: nombre, correo, contrasena, direccion, fechaNacimiento } = usuario;

    try {
      await this.dbInstance.executeSql(
        `INSERT INTO usuarios (usuario, correo, contrasena, direccion, fechaNacimiento)
         VALUES (?, ?, ?, ?, ?)`,
        [nombre, correo, contrasena, direccion, fechaNacimiento]
      );
      console.log('✅ Usuario registrado con éxito');
    } catch (err) {
      console.error('❌ Error al registrar usuario:', err);
      throw err;
    }
  }

  async validarUsuario(usuario: string, contrasena: string): Promise<boolean> {
    if (!this.dbInstance) return false;

    try {
      const res = await this.dbInstance.executeSql(
        `SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?`,
        [usuario, contrasena]
      );
      return res.rows.length > 0;
    } catch (err) {
      console.error('❌ Error al validar usuario:', err);
      return false;
    }
  }

  async insertarPerfil(perfil: any): Promise<void> {
    if (!this.dbInstance) return;

    const {
      usuario,
      nombreCompleto,
      telefono,
      plataforma,
      categorias,
      descripcion,
      avatar,
      juegosSeguidos,
    } = perfil;

    try {
      await this.dbInstance.executeSql(
        `INSERT OR REPLACE INTO perfil_usuario 
         (usuario, nombreCompleto, telefono, plataforma, categorias, descripcion, avatar, juegosSeguidos)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          usuario,
          nombreCompleto,
          telefono,
          plataforma,
          categorias.join(','),
          descripcion,
          avatar,
          juegosSeguidos.join(','),
        ]
      );
      console.log('✅ Perfil guardado');
    } catch (err) {
      console.error('❌ Error al guardar perfil:', err);
      throw err;
    }
  }

  async obtenerPerfilPorUsuario(usuario: string): Promise<any | null> {
    if (!this.dbInstance) return null;

    try {
      const res = await this.dbInstance.executeSql(
        `SELECT * FROM perfil_usuario WHERE usuario = ?`,
        [usuario]
      );

      if (res.rows.length > 0) {
        const fila = res.rows.item(0);
        return {
          nombreCompleto: fila.nombreCompleto,
          telefono: fila.telefono,
          plataforma: fila.plataforma,
          categorias: fila.categorias ? fila.categorias.split(',') : [],
          descripcion: fila.descripcion,
          avatar: fila.avatar,
          juegosSeguidos: fila.juegosSeguidos ? fila.juegosSeguidos.split(',') : [],
        };
      }

      return null;
    } catch (err) {
      console.error('❌ Error al obtener perfil:', err);
      return null;
    }
  }
}
