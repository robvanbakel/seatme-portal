import mitt from "mitt";

const emitter = mitt<{
  openReservation: string | null;
}>();

export default emitter;
