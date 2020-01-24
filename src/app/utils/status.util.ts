export class StatusUtil {
  public static convert(status: string): string {
      switch (status) {
          case 'confirmed': return 'Confirmed';
          case 'waiting_payment': return 'Waiting for Payment';
          case 'canceled': return 'Cancelled';
          case 'in_transit': return 'In tansit';
          case 'completed': return 'Completed';
          default: return 'Confirmed';
      }
  }
}
