function TaskFilter ({filter, onAddFilter}) {
    //Aquí sigue recibiendo el filtro ya que el taksocntext no lo utiliza
    //Controla el filtro escogiendolo y poniendo el valor del filtro que ya existe acutalmente
    return <div class="filtro">
        <label htmlFor="filter">Filter</label>
        <select name="filter" id="filter" onChange={(e) => onAddFilter(e.target.value)} value={filter}>
            <option value="">Todas</option>
            <option value="false">Activas</option>
            <option value="true">Completadas</option>
        </select>
    </div>
}

export default TaskFilter;