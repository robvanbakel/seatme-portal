export default () => {
  useProfileStore().$dispose();
  useReservationsStore().$dispose();
  useSettingsStore().$dispose();
};
