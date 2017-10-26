query like

{
  read(selector:{aggregateId:"client2", version:10}) {
    aggregateId
    data
    version
  }
}
