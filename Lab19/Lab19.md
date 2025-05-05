## 1. ¿Qué capacidades aporta a la aplicación la implementación de este modelo de datos (MER) con respecto al control de acceso?

- **Asignación dinámica de permisos**  
  Gracias a las tablas _Roles_, _Privilegios_ y la relación _Usuarios – Roles – Privilegios_, la aplicación puede:
  - Crear, modificar o eliminar roles sin tocar código.
  - Otorgar o revocar privilegios a un rol de forma centralizada.
  - Heredar automáticamente permisos cuando un usuario cambia de rol.

- **Separación de funciones (SoD)**  
  Al definir roles para cada área o función (por ejemplo, _Administrador_, _Contabilidad_, _Atención al cliente_), se evita que un mismo usuario acumule permisos contrapuestos (p. ej. autorizar y auditar pagos).

- **Principio de “menor privilegio”**  
  Cada usuario sólo recibe los privilegios estrictamente necesarios para su rol, reduciendo la superficie de ataque y minimizando riesgos por errores u omisiones.

- **Facilidad de gestión y escalabilidad**  
  - Añadir un nuevo módulo o funcionalidad implica simplemente crear un nuevo privilegio y asignarlo al/los rol(es) adecuados.  
  - Cuando crece el número de usuarios, las asignaciones se mantienen sencillas: sólo hay que gestionar roles en lugar de millones de permisos por usuario.

- **Auditoría y trazabilidad**  
  - Se pueden registrar en logs qué rol (y por tanto qué conjunto de privilegios) ejecutó cada acción.  
  - Facilita la generación de reportes de cumplimiento y cumplimiento de normativas (ISO, SOX…).

- **Interfaz de administración autónoma**  
  Con una interfaz de gestión de roles/privilegios en la capa más alta de la aplicación, usuarios con permisos especiales podrán:
  1. Crear nuevos roles y asignarles privilegios.  
  2. Asignar roles a usuarios.  
  3. Revisar en tiempo real qué privilegios tiene cada usuario.

---

## 2. ¿En qué consiste el control de acceso basado en roles (RBAC)?

### 2.1 Definición  
RBAC (Role-Based Access Control) es un modelo de seguridad en el que:
- **Roles** agrupan un conjunto de **privilegios** (acciones permitidas).  
- **Usuarios** adquieren permisos al ser asignados a uno o varios roles.

### 2.2 Componentes básicos  
- **Usuario**: entidad que se autentica en el sistema.  
- **Rol**: agrupación lógica de permisos (por ejemplo, _Editor_, _Viewer_).  
- **Privilegio**: permiso de bajo nivel (por ejemplo, _crear_usuario_, _eliminar_transacción_).  
- **Sesión**: contexto activo en el que un usuario “activa” uno o varios roles.

### 2.3 Flujo de autorización  
1. El usuario se autentica.  
2. El sistema carga sus roles asignados.  
3. Para cada petición, se verifica si alguno de los roles del usuario incluye el privilegio necesario.  
4. Si lo tiene, permite la operación; si no, devuelve “Forbidden”.

### 2.4 Principales ventajas  
- Escalabilidad: gestionar roles es más sencillo que gestionar permisos por usuario.  
- Mantenimiento: cambios de política se traducen en reasignaciones de rol, no en modificaciones de código.  
- Cohesión: los roles reflejan la estructura organizativa o los procesos de negocio.

### 2.5 Limitaciones  
- Hay que diseñar bien la taxonomía de roles para no acabar con “rolitis” (demasiados roles solapados).  
- RBAC puro no contempla restricciones contextuales (p. ej. “sólo hoy”, “desde cierta IP”) sin extensiones.

---

## 3. Análisis de dos sistemas de control de acceso

| Sistema                                | Modelo            | Descripción breve                                                                                                                                      | Ventajas principales                                                                                                                     | Desventajas principales                                                                                                                   |
|----------------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Windows Active Directory (AD)**      | RBAC              | Gestión centralizada de usuarios, grupos (roles) y políticas de acceso a recursos de red (archivos, impresoras, aplicaciones).                          | • Roles (grupos) y políticas de GPO centralizadas<br>• Delegación administrativa<br>• Integración SSO con Kerberos                         | • Curva de aprendizaje en diseño de OU y GPO<br>• Coste de licenciamiento y complejidad en entornos híbridos                             |
| **Linux/Unix Filesystem (chmod/chown)**| Discretionary AC  | Cada archivo y carpeta tiene un propietario, un grupo y permisos _rwx_ para propietario/grupo/otros. Los usuarios asignan permisos a su discreción.   | • Muy sencillo de entender e implementar<br>• No requiere infraestructura adicional                                                       | • Los permisos se gestionan archivo a archivo<br>• Difícil de escalar en entornos grandes<br>• Carece de separación de funciones y auditoría |

### 3.1 Windows Active Directory (RBAC)
- **Roles**: Representados por **grupos de seguridad**.  
- **Privilegios**: Políticas de grupo (GPO), ACLs de archivos/servicios, derechos de usuario.  
- **Administración**: Consola de AD Users & Computers y Group Policy Management.  
- **Pros**:  
  - Delegación granular de administración.  
  - Integración con casi todas las apps empresariales (Exchange, SharePoint…).  
  - Auditoría centralizada y reportes.  
- **Contras**:  
  - Requiere servidores dedicados y licencias Windows Server.  
  - Diseño inicial de OU y GPOs puede ser complejo.  

### 3.2 Linux/Unix Filesystem (Discretionary Access Control, DAC)
- **Permisos**: Leer/escribir/ejecutar para _owner_, _group_, _others_.  
- **Administración**: `chmod`, `chown`, `chgrp`.  
- **Pros**:  
  - Sencillo y conocido por prácticamente cualquier administrador.  
  - No depende de servicios adicionales.  
- **Contras**:  
  - Los usuarios con permisos de propietario pueden otorgar permisos a quien sea (menos control).  
  - No hay un concepto de rol; gestionar permisos en miles de ficheros es muy laborioso.  
  - Auditoría limitada: hay que configurar adicionalmente `auditd` u otras herramientas.

---

> **Conclusión breve**  
> - **RBAC** es ideal cuando necesitas un sistema escalable, centralizado y alineado con la organización.  
> - **DAC** (sistemas sin RBAC) funciona bien para entornos pequeños o muy estáticos, pero se vuelve inmanejable en escenarios de crecimiento o alta rotación de personal.
