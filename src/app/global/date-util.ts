export class DateUtil {
  public static fixDate = (date: any) => {
    const initial = new Date(date);
    let userTimezoneOffset = initial.getTimezoneOffset() * 60000;
    const fixedDate = new Date(initial.getTime() + userTimezoneOffset);
    return fixedDate;
  };
}
